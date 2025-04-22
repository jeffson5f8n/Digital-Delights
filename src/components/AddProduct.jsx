import axios from "axios";
import { useRef, useState } from "react";

const AddProducts = () => {
  const [product_id, setProductId] = useState(""); // State for Product ID
  const [product_name, setProductName] = useState("");
  const [product_desc, setProductDesc] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setLoading(`Uploading ${product_name}...`);

      const data = new FormData();
      data.append("product_id", product_id); // Append product_id
      data.append("product_name", product_name);
      data.append("product_desc", product_desc);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post(
        "https://jeffson5f8n.pythonanywhere.com/api/addproduct",
        data
      );

      setLoading("");
      setSuccess(response.data.Success);
      setProductId(""); // Reset Product ID field
      setProductName("");
      setProductDesc("");
      setProductCost("");
      fileInputRef.current.value = "";
    } catch (error) {
      setLoading("");
      setError("Failed to upload. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "60px",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-8 col-lg-6 p-4 rounded-4"
            style={{
              background: "transparent",
              color: "#fff",
              boxShadow: "0 0 30px rgba(0, 191, 255, 0.2)",
              border: "1px solid #00bfff",
              padding: "30px",
              maxWidth: "100%",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "#00bfff", fontWeight: "bold" }}>
              💙 Add a New Product
            </h3>

            {loading && <div className="alert alert-info text-center">{loading}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-success text-center">{success}</div>}

            <form onSubmit={submitForm}>
              {/* Product ID Field */}
              <div className="mb-4">
                <label className="form-label" style={{ color: "#00bfff" }}>Product ID</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-info"
                  placeholder="Enter Product ID"
                  required
                  value={product_id}
                  onChange={(e) => setProductId(e.target.value)}
                  style={{
                    marginBottom: '1rem',
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Product Name Field */}
              <div className="mb-4">
                <label className="form-label" style={{ color: "#00bfff" }}>Product Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-info"
                  placeholder="e.g. Gaming Mouse"
                  required
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
                  style={{
                    marginBottom: '1rem',
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Product Description Field */}
              <div className="mb-4">
                <label className="form-label" style={{ color: "#00bfff" }}>Description</label>
                <textarea
                  className="form-control bg-dark text-light border-info"
                  rows="4"
                  placeholder="Enter a short description..."
                  required
                  value={product_desc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  style={{
                    marginBottom: '1rem',
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                ></textarea>
              </div>

              {/* Product Cost Field */}
              <div className="mb-4">
                <label className="form-label" style={{ color: "#00bfff" }}>Cost (Kshs)</label>
                <input
                  type="number"
                  className="form-control bg-dark text-light border-info"
                  placeholder="e.g. 4500"
                  required
                  value={product_cost}
                  onChange={(e) => setProductCost(e.target.value)}
                  style={{
                    marginBottom: '1rem',
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Product Photo Field */}
              <div className="mb-4">
                <label className="form-label" style={{ color: "#00bfff" }}>Product Photo</label>
                <input
                  type="file"
                  className="form-control bg-dark text-light border-info"
                  required
                  ref={fileInputRef}
                  onChange={(e) => setProductPhoto(e.target.files[0])}
                  style={{
                    marginBottom: '1rem',
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                className="btn w-100"
                style={{
                  backgroundColor: "#00bfff",
                  border: "none",
                  color: "#000814",
                  fontWeight: "bold",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                Upload Product 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
