import React, { Component } from "react";
import items from "./data";

// Create Provider
const RoomContext = React.createContext();
// <RoomContext.Provider value={}

// Class that can use the RoomProvider
class RoomProvider extends Component {
  // Create state and then pass the Provider
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  };

  // getData function
  // TODO: create function

  componentDidMount() {
    // this.getData
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
      rooms,
      featuredRooms,
      // sortedRooms: rooms,
      loading: false
    });
  }

  // Format data from the database
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  // Filter rooms based on the selected room, and make availabel in context
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// Higher Order Function
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
