import "../Pages/PageNotFound.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <section className="page_404">
        <div className="w-full h-full ">
          <div className="w-full h-full flex justify-center items-center relative">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center absolute top-3 left-1/2 -translate-x-1/2">
                    404
                  </h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">{`Look like you're lost`}</h3>

                  <p>the page you are looking for not available!</p>

                  <button  onClick={()=>{
                    navigate("/")
                  }} className="link_404">
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
