
import { useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt } from 'react-icons/fa';



// Form validation schema
// const schema = yup.object().shape({
//   name: yup.string().required('Name is required').min(2),
//   email: yup.string().required('Email is required').email(),
//   phone: yup.string().required('Phone is required').matches(/^\d{10}$/, 'Enter 10 digit phone number'),
//   message: yup.string().required('Message is required').min(5),
// });

const ContactUs = () => {
  const location = useLocation();
  const data = [
    {
      heading: 'Office Address',
      content: 'Azamgarh, uttar pradesh'
    },
    {
      heading: 'Call Us',
      content: '+91 7309335028'
    },
    {
      heading: 'Mail Us',
      content: 'hydraskup50@gmail.com'
    }
  ];

  
  return (
    <>


      <div className="container-fluid py-5 bg-light">
        <div className="row p-5 bg-white mx-auto shadow" style={{ maxWidth: "1100px" }}>
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label"><FaUser className="me-2" />Name</label>
                <input type="text" className='form-control' placeholder="Enter Your Name" />
                
              </div>

              <div className="mb-3">
                <label className="form-label"><FaEnvelope className="me-2" />Email</label>
                <input type="email" className='form-control' placeholder="Enter Your Email" />
                
              </div>

              <div className="mb-3">
                <label className="form-label"><FaPhone className="me-2" />Phone</label>
                <input type="text" className='form-control' placeholder="Enter Your Mobile Number" />
                
              </div>

              <div className="mb-3">
                <label className="form-label"><FaComment className="me-2" />Message</label>
                <textarea className='form-control'  rows={4} placeholder="Enter Your Message"></textarea>
                
              </div>

              <button type="submit" className="btn btn-dark w-100">Submit</button>
            </form>
          </div>

          <div className="col-md-6">
            <h5 className="text-decoration-underline mb-4">Contact Info</h5>

            <p className="fw-bold text-danger"><FaMapMarkerAlt className="me-2" />{data[0].heading}</p>
            <p className="text-muted">{data[0].content}</p>

            <p className="fw-bold text-danger"><FaPhone className="me-2" style={{ transform: 'rotate(90deg)' }} />{data[1].heading}</p>
            <p><a className="text-dark text-decoration-none">{data[1].content}</a></p>

            <p className="fw-bold text-danger"><FaEnvelope className="me-2" />{data[2].heading}</p>
            <p><a className="text-dark text-decoration-none">{data[2].content}</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;