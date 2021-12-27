import React from "react";

    // It is nicer to use destructuring to separate
    // the props details, that way we can use the
    // props name directly like this below
const Card = ({name, email, id}) => { 
    // OR THIS SAME WAY THAT IS COMMENTED OUT
    // const { name, email, id } = props;
  return (
    <div className="tc bg-light-green dib br3 ma2 grow bw2 shadow-5"> 
      <img src={`https://robohash.org/${id}?200x200`} alt="robots" />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
