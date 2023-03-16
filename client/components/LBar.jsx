import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { channelStore, userCredentialsStore } from "../store.js";

export default function LBar() {
  //JUNAID
  //all hooks removed from this component
  const {
    setCurrentChannel,
    setUserChannels,
    setChannels,
    channels,
    userChannels,
    newChannel,
    setNewChannel,
  } = channelStore();
  const { username } = userCredentialsStore();
  console.log(userChannels, "1st");
  // Giles Steiner
  //
  // Purpose: pulls the list of channels that exist in the database
  // and only show the ones that match with the users cookie preference
  useEffect(() => {
    console.log(userChannels, "2nd userchannels");
    const intervalId = setInterval(async () => {
      console.log(userChannels, "3rd userchannels");
      async function getChannels() {
        const res = await fetch("./db/getChannels", {
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            console.log(userChannels, "4th")
            return response.json();
          })
          .then((data) => {
            console.log(userChannels, "5th");
            setChannels(data);
            console.log(data, "data 2");
            console.log(channels, "channels");
            const userChannelsArr = data.filter((el) => !userChannels.includes(el));
            setUserChannels(userChannels);
            console.log(userChannels, "6th")
          })
          .catch((error) => {
            console.error("Error in grabbing chats from channel lbar:", error);
          });
      }
      getChannels();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Tim Muller
  //
  // When user clicks on the add channel button they will be directed to make a new channel which will then be shown on the screen and
  // Be able to be clicked. This will then call the server which will create a new channel in the database and add whichever user made
  // the channel
  const addChannel = () => {
    console.log("adding new channel:", newChannel);
    const reqBody = {
      channel: newChannel,
      username,
    };
    if (newChannel.length) {
      fetch("./db/newChannel", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("added:", newChannel);
        setNewChannel("");
      });
    } else {
      alert("invalid input");
      return;
    }
  };

  const delChannel = async () => {
    console.log("DELETE CHANNEL FETCH");
    await fetch("./db/deleteChannel", {
      method: "POST",
      body: JSON.stringify({ channel: newChannel }),
      headers: { "Content-Type": "application/json" },
    });
  };

  // Giles Steiner
  //
  // When user clicks to change channel the currentChannel state is changed
  // and adds them to res.locals.messages
  function changeChannelHandler(newChannelName) {
    console.log("in here");
    setCurrentChannel(newChannelName);
  }

  // Giles Steiner
  //
  // When user clicks a new message from the drop down menu a PUT request is done to
  // db/subscribe subscribing the user to that channel and updating the cookie preference
  async function browseChannelClick() {
    // console.log("clicked: ", document.getElementById('browseChannelName').value);
    console.log("subscribing to new channel");
    await fetch("./db/subscribe", {
      method: "PUT",
      body: JSON.stringify({
        channel: document.getElementById("browseChannelName").value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error in grabbing chats from channel lbar2:", error);
      });
  }

  // Giles Steiner
  //
  // channels.map is iterating through entire channels state and if an element is not already
  // in the users cookie preferences it is displayed on a dropdown menu as a new channel for the
  // user to subscrbie to

  // userChannels.map is iterating through userChannels state and rendering a button for each channel
  // in the users cookie prefences
  // onclick invokes click handler function which changes currentChannel state
  //
  // Chat window is rendered as a child component and the current channel is passed down
  // as a prop
  return (
    <>
      <div className="chatPage">
        <div className="channelSideBar">
          <div id="browseChannels">
            Browse Channels<br></br>
            {/* add onClick to the select drop-down menu below which will fetch query the server, rather than setTimeout every few seconds */}
            <select id="browseChannelName">
              {channels.map((channel, index) => {
                if (!userChannels.includes(channel)) {
                  return (
                    <option key={index + 100} value={channel}>
                      {channel}
                    </option>
                  );
                }
              })}
            </select>
            <button
              type="button"
              className="sendButton"
              onClick={browseChannelClick}
            >
              Subscribe
            </button>
          </div>

          <div id="channelList">
            {userChannels.map((channel, index) => (
              <div
                className="channelButton"
                key={index}
                onClick={() => changeChannelHandler(channel)}
              >
                <strong># </strong>
                {channel.toLowerCase()}
              </div>
            ))}
          </div>

          <div id="addChannel">
            <section className="addChannelBox">
              <h2>Add a new channel!</h2>
              <form className="channelForm">
                <div className="channelNameBox">
                  <input
                    type="text"
                    id="inputChannel"
                    onChange={(e) => setNewChannel(e.target.value)}
                  />
                </div>
                <button
                  id="addChannelButton"
                  type="button"
                  className="addChannelButton"
                  onClick={addChannel}
                >
                  Add New Channel
                </button>
              </form>
            </section>
          </div>
          <div className="delChannelBox">
            <div>Delete a channel!</div>
            <form className="channelForm">
              <div className="channelNameBox">
                <input
                  type="text"
                  id="inputChannelDel"
                  onChange={(e) => setNewChannel(e.target.value)}
                />
              </div>
              <button
                id="delChannelButton"
                type="button"
                className="delChannelButton"
                onClick={delChannel}
              >
                Delete Channel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
