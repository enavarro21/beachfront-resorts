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
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData function
  // TODO: create function

  componentDidMount() {
    // this.getData
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);

    // Set max values for the selections of the room filters
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
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

  // Grab all values given by the controlled inputs and set state
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        // Sets the named value for each matching [name]
        [name]: value
      },
      this.filterRooms
    );
  };

  // Filter rooms based on the selected options
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    // Get all the rooms
    let tempRooms = [...rooms];
    // Transform the values from string to int
    capacity = parseInt(capacity);
    price = parseInt(price);

    // Filter rooms by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // Filter rooms by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // Filter rooms by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // Filter rooms by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // Filter rooms by is breakfast free
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // Filter rooms by pets allowed
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // Change State
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// Higher Order Function for accessing RoomConsumer
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
