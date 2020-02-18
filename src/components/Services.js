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
          "Go for a hike to one of many waterfalls nearby. You can even hike out to dolphin cove."
      },
      {
        icon: <FaShuttleVan />,
        title: "Free shuttle",
        info:
          "Head up to the North Shore with our free shuttle service. You can even take the shuttle down to Waikiki beach!"
      },
      {
        icon: <IoIosBeer />,
        title: "Tasty beer",
        info:
          "With over 150 beers on tap, we are sure to find you the perfect flavor!"
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
