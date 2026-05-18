import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Webistic · Remote</h5>
              </div>
              <h3>Apr – Jul 2024</h3>
            </div>
            <p>
              Built and maintained scalable web applications using Python
              (Django/Flask), React, and JavaScript. Optimised relational and
              NoSQL databases, improved frontend UX, and deployed cloud-hosted
              apps on AWS/Heroku via CI/CD pipelines in an Agile team.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Onebanc Technologies · Gurugram</h5>
              </div>
              <h3>Aug 2024 – May 2025</h3>
            </div>
            <p>
              Delivered secure, responsive web apps with JavaScript, HTML, and
              CSS, increasing user engagement by 15%. Designed RESTful APIs in
              Python, administered MySQL/PostgreSQL/MongoDB, implemented JWT
              auth, and maintained CI/CD pipelines — reducing client-server
              latency by 20% and post-production bugs by 20%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Python AI Developer</h4>
                <h5>Perimattic · Remote</h5>
              </div>
              <h3>Jun – Nov 2025</h3>
            </div>
            <p>
              Developed and deployed FastAPI-powered AI backends — cutting
              model response times by 30%. Built AI resume parsing pipelines
              with 95%+ extraction accuracy, integrated OpenAI &amp; Gemini
              APIs for automated insights, and fine-tuned ML models to boost
              prediction reliability by 20%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Developer Engineer</h4>
                <h5>Stulink Private Limited · Remote</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building intelligent AI-driven features and scalable backend
              infrastructure at Stulink. Designing LLM-powered workflows,
              integrating NLP and generative AI capabilities into core
              products, and optimising system performance to deliver
              production-ready AI solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
