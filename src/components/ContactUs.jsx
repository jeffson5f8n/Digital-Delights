

const ContactUs = () => {
  return (
    <div className="container-fluid bg-black text-white">
      {/* Header Section */}
      <div className="row mt-5 justify-content-center">
        <div className="col-12 text-center mb-5">
          <h2 className="text-blue-400 text-4xl font-semibold">Contact Us</h2>
        </div>

      </div>

      {/* First Set of Images (Three) with breathing space */}
      <div className="row justify-content-between mb-5">
        <div className="col-md-4 mb-4 card shadow-lg rounded-xl">
          <img
            src="images/room1.jfif"
            alt="Room 1"
            width="100%"
            height="430px"
            className="rounded-xl"
          />
        </div>
        <div className="col-md-4 mb-4 card shadow-lg rounded-xl">
          <img
            src="images/room2.jfif"
            alt="Room 2"
            width="100%"
            height="430px"
            className="rounded-xl"
          />
        </div>
        <div className="col-md-4 mb-4 card shadow-lg rounded-xl">
          <img
            src="images/room4.jfif"
            alt="Room 4"
            width="100%"
            height="430px"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Second Set of Images (Two) with spacing between them */}
      <div className="row justify-content-between">
        <div className="col-md-6 mb-4 card shadow-lg rounded-xl">
          <img
            src="images/room3.jfif"
            alt="Room 3"
            height="530px"
            className="w-100 rounded-xl"
          />
        </div>
        <div className="col-md-6 mb-4 card shadow-lg rounded-xl">
          <div className="card-body p-4">
            <h3 className="text-blue-400 text-xl mb-3">
              <b>We are Located at:</b>
            </h3>
            <ul className="list-group list-group-flush text-white">
              <li className="list-group-item bg-transparent border-0">
                <span className="text-blue-300">123 Business Street, building 101, Nairobi, NRBI 0100</span>
              </li>
              <li className="list-group-item bg-transparent border-0">
                <span className="text-blue-300">Business Hours: Sun-Sun, 7AM - 9PM</span>
              </li>
              <li className="list-group-item bg-transparent border-0">
                <span className="text-blue-300">Phone: +254 757 568884</span>
              </li>
              <li className="list-group-item bg-transparent border-0">
                <span className="text-blue-300">Email: odanzel33@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ContactUs;
