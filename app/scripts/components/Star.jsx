/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

import numeral from 'numeral';
import styled from 'styled-components';

import colors from '../themes/colors';

let blueStar;
let orangeStar;
let whiteStar;
let yellowStar;

if (chrome && chrome.extension && chrome.extension.getURL) {
  blueStar = chrome.extension.getURL('images/star-blue.svg');
  orangeStar = chrome.extension.getURL('images/star-orange.svg');
  whiteStar = chrome.extension.getURL('images/star-white.svg');
  yellowStar = chrome.extension.getURL('images/star-yellow.svg');
} else {
  blueStar = require('../../images/star-blue.svg');
  orangeStar = require('../../images/star-orange.svg');
  whiteStar = require('../../images/star-white.svg');
  yellowStar = require('../../images/star-yellow.svg');
}

const starIcons = {
  [colors.blue]: blueStar,
  [colors.orange]: orangeStar,
  [colors.white]: whiteStar,
  [colors.yellow]: yellowStar,
};

const StarBadge = styled.span`
  background-color: ${colors.gray};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  margin: 0 0 0 0.25rem;
  padding: 0.25rem 0.5rem;
`;

const StarIcon = styled.img`
  background-color: transparent !important;
  margin: 0 0.25rem 0 0;
`;

const StarText = styled.span`
  color: ${({ color }) => color};
`;

class Star extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    count: 0,
    loading: false,
  };

  colorsFromCount = (count) => {
    switch (true) {
      case count >= 10000:
        return { star: colors.orange, text: colors.orange };
      case count < 10000 && count >= 5000:
        return { star: colors.yellow, text: colors.yellow };
      case count < 5000 && count >= 1000:
        return { star: colors.white, text: colors.white };
      default:
        return { star: colors.blue, text: colors.lightBlue };
    }
  };

  render() {
    const { count, loading } = this.props;
    const { star: starColor, text: textColor } = this.colorsFromCount(count);
    const countText = loading || count === -1 ? '...' : numeral(count).format('0,0');
    return (
      <StarBadge>
        <StarIcon src={starIcons[starColor]} alt={`${starColor} star`} />
        <StarText color={textColor}>{countText}</StarText>
      </StarBadge>
    );
  }
}

export default Star;
