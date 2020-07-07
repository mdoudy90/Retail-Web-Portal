import ProductCardView from "../relatedItems-componenets/ProductCardView.jsx";
import ComparisonModal from "../relatedItems-componenets/ComparisonModal.jsx";

import React from "react";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductCard: 0,
      modalView: false,
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  handleClick() {
    this.setState({ modalView: !this.state.modalView });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  handleDelete(e) {
    let outfitArray = JSON.parse(localStorage.getItem("outFitArray"));

    outfitArray.splice(e.target.id, 1);
    localStorage.setItem("outFitArray", JSON.stringify(outfitArray));
    this.props.alterList(outfitArray);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  handleAdd(e, value) {
    let outfitArray = JSON.parse(localStorage.getItem("outFitArray"));

    outfitArray.push({
      id: 1,
      name: "TEST ADD",
      slogan: "TEST ADD",
      description: "TEST ADD",
      category: "TEST ADD",
      default_price: "TEST ADD",
    });
    localStorage.setItem("outFitArray", JSON.stringify(outfitArray));
    this.props.alterList(outfitArray);

    this.nextButton.style.visibility = "visible";
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  handleNext() {
    // this takes the current productCard and mutliplies it by the width of a single product card. Then takes that number and translate the div by that number

    if (
      this.state.currentProductCard <
      this.cardContainer.children.length - 1
    ) {
      if (
        this.state.currentProductCard + 5 >=
        this.cardContainer.children.length
      ) {
        this.nextButton.style.visibility = "hidden";
      }

      this.previousButton.style.visibility = "visible";

      let newCurrentCard = this.state.currentProductCard + 1;

      this.setState({ currentProductCard: newCurrentCard }, () => {
        this.cardContainer.style.transitionDuration = "1s";
        this.cardContainer.style.transform = `translate(-${
          26.5 * this.state.currentProductCard
        }vh)`;
      });
    }
  }
  ////////////////////////////////////////////////////////////////////////////

  handlePrevious() {
    if (this.state.currentProductCard > 0) {
      if (this.state.currentProductCard === 1) {
        this.previousButton.style.visibility = "hidden";
      }
      this.nextButton.style.visibility = "visible";
      let newCurrentCard = this.state.currentProductCard - 1;

      this.setState({ currentProductCard: newCurrentCard }, () => {
        this.cardContainer.style.transitionDuration = "1s";
        this.cardContainer.style.transform = `translate(-${
          26.5 * this.state.currentProductCard
        }vh)`;
       
      });
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  render() {
    var productList = this.props.list;
    if (this.state.modalView) {
      return (
        <div>
          <ComparisonModal />
          <div className="viewer">
            <img
              ref={(ref_id) => (this.previousButton = ref_id)}
              onClick={this.handlePrevious}
              className="pButton"
              src="./assets/left-arrow-icon.png"
            />
            <img
              ref={(ref_id) => (this.nextButton = ref_id)}
              onClick={this.handleNext}
              className="nButton"
              src="./assets/right-arrow-icon.png"
            />

            <div
              ref={(ref_id) => (this.cardContainer = ref_id)}
              className="cardContainer"
            >
              {productList.map((item, i) => {
                return (
                  <ProductCardView
                    value={i}
                    handleClick={
                      this.props.view === "relatedProducts"
                        ? this.handleClick
                        : this.handleDelete
                    }
                    view={this.props.view}
                    productInfo={item}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.view !== "relatedProducts" ? (
            <div onClick={this.handleAdd}>add card functionality</div>
          ) : null}

          <div className="viewer">
            <img
              ref={(ref_id) => (this.previousButton = ref_id)}
              onClick={this.handlePrevious}
              className="pButton"
              src="./assets/left-arrow-icon.png"
            />
            <img
              ref={(ref_id) => (this.nextButton = ref_id)}
              onClick={this.handleNext}
              className="nButton"
              src="./assets/right-arrow-icon.png"
            ></img>

            <div
              ref={(ref_id) => (this.cardContainer = ref_id)}
              className="cardContainer"
            >
              {productList.map((item, i) => {
                return (
                  <ProductCardView
                    value={i}
                    view={this.props.view}
                    handleClick={
                      this.props.view === "relatedProducts"
                        ? this.handleClick
                        : this.handleDelete
                    }
                    productInfo={item}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Carousel;