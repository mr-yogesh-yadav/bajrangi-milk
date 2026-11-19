import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaLeaf,
  FaThLarge,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaArrowUp,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
} from "react-icons/fa";
import "./AdminDashboard.css";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/admin`;

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [cowPrice, setCowPrice] = useState("");
  const [buffaloPrice, setBuffaloPrice] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [savingPrices, setSavingPrices] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");
  const [settingsError, setSettingsError] = useState("");

  const token = sessionStorage.getItem("adminToken");

 // Fetch Orders + Auto Refresh
useEffect(() => {
  if (!token) {
    navigate("/admin", { replace: true });
    return;
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch orders.");
      }

      setOrders(data.orders || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 30000);

  return () => clearInterval(interval);

}, [navigate, token]);
  const fetchSettings = async () => {
    try {
      setSettingsLoading(true);
      setSettingsError("");
      setSettingsMessage("");

      const response = await fetch(`${API_URL}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to load prices.");
      }

      setCowPrice(String(data.settings.cowPrice));
      setBuffaloPrice(String(data.settings.buffaloPrice));
    } catch (err) {
      setSettingsError(err.message);
    } finally {
      setSettingsLoading(false);
    }
  };
  const savePrices = async () => {
    const cow = Number(cowPrice);
    const buffalo = Number(buffaloPrice);

    if (
      cowPrice.trim() === "" ||
      buffaloPrice.trim() === "" ||
      !Number.isFinite(cow) ||
      !Number.isFinite(buffalo) ||
      cow <= 0 ||
      buffalo <= 0
    ) {
      setSettingsError("Please enter valid milk prices.");
      setSettingsMessage("");
      return;
    }

    try {
      setSavingPrices(true);
      setSettingsError("");
      setSettingsMessage("");

      const response = await fetch(`${API_URL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cowPrice: cow,
          buffaloPrice: buffalo,
        }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to save prices.");
      }

      setCowPrice(String(data.settings.cowPrice));
      setBuffaloPrice(String(data.settings.buffaloPrice));
      setSettingsMessage("Milk prices saved successfully!");
    } catch (err) {
      setSettingsError(err.message);
    } finally {
      setSavingPrices(false);
    }
  };
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setOrders((previous) =>
        previous.map((order) => (order._id === orderId ? data.order : order)),
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin", { replace: true });
  };

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      confirmed: orders.filter((o) => o.status === "Confirmed").length,
      delivered: orders.filter((o) => o.status === "Delivered").length,
    }),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activePage === "Pending Orders") {
      result = result.filter((o) => o.status === "Pending");
    } else if (activePage === "Completed Orders") {
      result = result.filter((o) => o.status === "Delivered");
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((o) =>
        [o.name, o.phone, o.address, o.milkType, o.status].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
        ),
      );
    }

    return result;
  }, [orders, activePage, search]);

  const menuItems = [
    { name: "Overview", icon: <FaThLarge /> },
    { name: "All Orders", icon: <FaShoppingBag /> },
    { name: "Pending Orders", icon: <FaClock /> },
    { name: "Completed Orders", icon: <FaCheckCircle /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  const changePage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setSearch("");
  };

  if (!token) return null;

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <FaLeaf />
          </div>
          <div>
            <h2>Bajrangi</h2>
            <span>MILK ADMIN</span>
          </div>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <p className="sidebar-heading">MAIN MENU</p>

        <nav className="admin-navigation">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={activePage === item.name ? "active" : ""}
              onClick={() => changePage(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.name === "Pending Orders" && stats.pending > 0 && (
                <small>{stats.pending}</small>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="profile-avatar">A</div>
            <div>
              <h4>Administrator</h4>
              <span>Store Manager</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <div>
            <span className="topbar-small">BAJRANGI MILK / ADMIN</span>
            <h2>{activePage}</h2>
          </div>

          <div className="topbar-right">
            <span className="admin-status-dot" />
            <span>Admin Panel</span>
          </div>
        </header>

        <div className="admin-content">
          {error && <div className="admin-error">{error}</div>}

          {activePage === "Overview" && (
            <>
              <div className="welcome-section">
                <div>
                  <span className="section-eyebrow">BUSINESS OVERVIEW</span>
                  <h1>Welcome to your Dashboard</h1>
                  <p>Manage your milk orders and daily operations.</p>
                </div>
                <div className="welcome-decoration">
                  <FaLeaf />
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon green">
                    <FaShoppingBag />
                  </div>
                  <span>Total Orders</span>
                  <h2>{stats.total}</h2>
                  <small>All received orders</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon yellow">
                    <FaClock />
                  </div>
                  <span>Pending Orders</span>
                  <h2>{stats.pending}</h2>
                  <small>Waiting for confirmation</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon blue">
                    <FaArrowUp />
                  </div>
                  <span>Confirmed Orders</span>
                  <h2>{stats.confirmed}</h2>
                  <small>Ready for processing</small>
                </div>

                <div className="stat-card">
                  <div className="stat-icon sage">
                    <FaCheckCircle />
                  </div>
                  <span>Delivered Orders</span>
                  <h2>{stats.delivered}</h2>
                  <small>Successfully delivered</small>
                </div>
              </div>

              <div className="dashboard-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Orders</h3>
                    <p>Latest customer orders</p>
                  </div>
                  <button onClick={() => changePage("All Orders")}>
                    View All
                  </button>
                </div>

                {loading ? (
                  <p className="empty-message">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="empty-message">No orders received yet.</p>
                ) : (
                  <div className="recent-orders">
                    {orders.slice(0, 5).map((order) => (
                      <div className="recent-order-item" key={order._id}>
                        <div className="recent-order-icon">
                          <FaTint />
                        </div>
                        <div className="recent-order-info">
                          <h4>{order.name}</h4>
                          <span>
                            {order.milkType} Milk · {order.quantity} L
                          </span>
                        </div>
                        <span
                          className={`order-status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {["All Orders", "Pending Orders", "Completed Orders"].includes(
            activePage,
          ) && (
            <div className="dashboard-panel orders-panel">
              <div className="panel-heading">
                <div>
                  <h3>{activePage}</h3>
                  <p>{filteredOrders.length} orders found</p>
                </div>

                <div className="order-search">
                  <FaSearch />
                  <input
                    type="search"
                    placeholder="Search customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <p className="empty-message">Loading orders...</p>
              ) : filteredOrders.length === 0 ? (
                <p className="empty-message">No matching orders found.</p>
              ) : (
                <div className="orders-list">
                  {filteredOrders.map((order) => (
                    <article className="order-card" key={order._id}>
                      <div className="order-card-top">
                        <div>
                          <span className="order-id">
                            ORDER #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <h3>{order.name}</h3>
                        </div>

                        <span
                          className={`order-status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="order-details-grid">
                        <p>
                          <FaPhone /> {order.phone}
                        </p>
                        <p>
                          <FaTint /> {order.milkType} Milk
                        </p>
                        <p>
                          <FaShoppingBag /> {order.quantity} Litres
                        </p>
                        <p>
                          <FaMapMarkerAlt /> {order.address}
                        </p>
                        <p>₹ Price/Litre: ₹{order.pricePerLitre}</p>
                        <p>₹ Total Amount: ₹{order.totalAmount}</p>
                      </div>

                      {order.instructions && (
                        <p className="order-instructions">
                          Note: {order.instructions}
                        </p>
                      )}

                      <div className="order-card-bottom">
                        <span>
                          {new Date(order.createdAt).toLocaleString("en-IN")}
                        </span>

                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activePage === "Settings" && (
            <div className="dashboard-panel settings-panel">
              <div className="section-eyebrow">STORE MANAGEMENT</div>

              <h2>Milk Price Management</h2>

              <p>
                Manage your cow and buffalo milk prices. Updated prices will be
                saved to your database.
              </p>

              {settingsLoading ? (
                <p className="empty-message">Loading milk prices...</p>
              ) : (
                <>
                  <div className="price-settings-grid">
                    <div className="price-setting-card">
                      <div className="price-setting-icon">
                        <FaTint />
                      </div>

                      <label htmlFor="cowPrice">Cow Milk Price</label>

                      <div className="price-input-wrapper">
                        <span>₹</span>
                        <input
                          id="cowPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={cowPrice}
                          onChange={(e) => setCowPrice(e.target.value)}
                          placeholder="Enter cow milk price"
                        />
                      </div>

                      <small>Price per litre</small>
                    </div>

                    <div className="price-setting-card">
                      <div className="price-setting-icon">
                        <FaTint />
                      </div>

                      <label htmlFor="buffaloPrice">Buffalo Milk Price</label>

                      <div className="price-input-wrapper">
                        <span>₹</span>
                        <input
                          id="buffaloPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={buffaloPrice}
                          onChange={(e) => setBuffaloPrice(e.target.value)}
                          placeholder="Enter buffalo milk price"
                        />
                      </div>

                      <small>Price per litre</small>
                    </div>
                  </div>

                  {settingsError && (
                    <p className="settings-error">{settingsError}</p>
                  )}

                  {settingsMessage && (
                    <p className="settings-success">{settingsMessage}</p>
                  )}

                  <button
                    className="save-prices-button"
                    onClick={savePrices}
                    disabled={savingPrices}
                  >
                    {savingPrices ? "Saving..." : "Save Prices"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
