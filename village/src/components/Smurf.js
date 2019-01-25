import React from "react";

const Smurf = props => {
  const smurf = props.smurfs.find(smurf => {
    return `${smurf.id}` === props.match.params.id;
  });
  return (
    <div className="Smurf">
      <div className="Smurf-header">
        <h3>{props.name}</h3>
        <img
          onClick={e => props.deleteSmurf(e, smurf.id)}
          className="trash-icon"
          src="https://img.icons8.com/dusk/20/000000/filled-trash.png"
          alt="trash-icon"
        />
      </div>
      <strong>Height: {props.height} tall </strong>
      <p>Age: {props.age} smurf years old</p>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
