import React from "react";
import PropTypes from "prop-types";

interface IProps {
  percentage: number;
}

const Progress = ({ percentage }: IProps) => {
  return (
    <div className="progress" style={{ height: 16 }}>
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
