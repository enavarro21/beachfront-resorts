import React, { Component } from "react";
import { FaCocktail, FaShuttleVan, FaHiking } from "react-icons/fa";
import { IoIosBeer } from "react-icons/io";


import Title from "./Title";

export default class Services extends Component {
  // Set up state for the services
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free cocktails",
        info:
          "Treat yourself to drinks on the beach. Sip Mai Tai's under the sun. Relax and enjoy the waves!"
      },
      {
        icon: <FaHiking />,
        title: "Endless hiking",
        info:
          "Treat yourself to drinks on the beach. Sip Mai Tai's under the sun. Relax and enjoy the waves!"
      },
      {
        icon: <FaShuttleVan />,
        title: "Free shuttle",
        info:
          "Treat yourself to drinks on the beach. Sip Mai Tai's under the sun. Relax and enjoy the waves!"
      },
      {
        icon: <IoIosBeer />,
        title: "Tasty beer",
        info:
          "Treat yourself to drinks on the beach. Sip Mai Tai's under the sun. Relax and enjoy the waves!"
      }
    ]
  };

  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
