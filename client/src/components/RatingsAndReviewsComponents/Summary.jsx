import React from 'react';

const Summary = ({ review }) => {
  let shortSummary = (
    <div className="review-tile-body-summary">
      {review.summary.slice(0, 60)}
    </div>
  );

  let longSummary = (
    <div>
      {shortSummary}...
      <br />
      <p className="review-tile-body-summary-rest">
        ...{review.summary.slice(60)}
      </p>
    </div>
  );

  let summary = review.summary.length < 60 ? shortSummary : longSummary;

  return summary;
};

export default Summary;
