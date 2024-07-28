import styled, { css } from 'styled-components';
import media from './media';

// @ts-ignore
const getColConfig = colConfig => css`
  grid-template-columns: ${colConfig};
`;

// @ts-ignore
const generateColMedia = mediaColConfig => {
  return css`
    ${Object.keys(mediaColConfig).map(key => {
      const colConf = mediaColConfig[key];
      return css`
        ${media[key]`
          ${getColConfig(colConf)}
        `}
      `;
    })}
  `;
};

/*
 * "width: 100%" added to cover some edge cases when grid is not taking full
 * available space depending on the parent container CSS
 */
// @ts-ignore
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ columns }) => columns || ''};
  grid-template-rows: ${({ rows }) => rows || ''};
  grid-gap: ${({ gridGap }) => gridGap || ''};
  ${({ mediaColConfig }) =>
    mediaColConfig ? generateColMedia(mediaColConfig) : ''}
`;

export default Grid;
