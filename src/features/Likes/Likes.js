import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { removeLikeItem } from "./actions";

import "./Likes.scss";

const Likes = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="likes mr-2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          onClick={toggle}
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <Button outline color="danger" className="border-0">
            <i className="fa fa-heart" />{" "}{props.likes.length}
          </Button>
        </DropdownToggle>
        <DropdownMenu className="like-list border-0 p-2" right>
          {!props.likes.length && <span>You haven't favourite recipies yet</span>}


          {props.likes.map(item => (
            <div
              className="d-flex justify-content-between align-items-center mb-1"
              key={item.id}
            >
              <Link to={`/recipe/${item.id}`} className="d-flex align-items-center">
                <img
                  src={`https://spoonacular.com/recipeImages/${
                    item.id
                  }-90x90.jpg`} height="40" className="mr-2"
                  alt={item.title}
                />

                {item.title}
              </Link>

              <i
                onClick={() => props.removeLike(item.id)}
                className="like-list__remove fas fa-trash"
              />
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = ({ likes }) => ({
  likes
});

const mapDispatchToProps = dispatch => ({
  removeLike: item => dispatch(removeLikeItem(item))
});

const connectedLikes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Likes);

export { connectedLikes as Likes };
export default connectedLikes;