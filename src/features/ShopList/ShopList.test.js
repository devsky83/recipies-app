import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import * as ReactReduxHooks from "../../hooks/react-redux";

import ShopList from "./ShopList";
import Item from "./Item/Item";

configure({ adapter: new Adapter() });

describe("ShopList", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureStore()({
      items: [
        {id:1, name: 'Bread', amount: 1, unit: 'kg'},
        {id:2, name: 'Milk', amount: 2, unit: 'oz'},
    ]
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<ShopList store={store}  />);
  });

  /*
  describe("on start", () => {
    it(" dispatch action getRecipe ", () => {
      const actions = store.getActions();
      expect(actions).toEqual([{ type: "GET_RECIPE", id: recipeId }]);
    });
  });
*/

  it("should render Item list", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });
});
