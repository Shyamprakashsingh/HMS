import React from "react";
import Img4 from "../../images/img4.jpg";
import user from "../../images/image.png";
import "./style/Card.css";

function Card({ name, prof, desc }) {
  return (
    <section className="section">
      <div className="container d-flex flex-wrap">
        <div className="col">
          <div className="card-container">
            <div className="card">
              <div className="front">
                <div className="cover">
                  <img src={Img4} alt="Cover" />
                </div>
                <div className="user">
                  <img className="img-circle" src={user} alt="User" />
                </div>
                <div className="content">
                  <div className="main">
                    <h3 className="name">{name}</h3>
                    <p className="profession">{prof}</p>
                    <p className="text-center">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
