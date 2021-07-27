import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const LinkComponent = ({ history, to, staticContext, onClick, tag: Tag, ...rest }) => (
    <Tag
        {...rest}
        onClick={(event) => {
            onClick(event);
            history.push(to)
        }}
    />
);
LinkComponent.propTypes = {
    to: PropTypes.string.isRequired,
    staticContext: PropTypes.any,
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    onClick: PropTypes.func
};
LinkComponent.defaultProps = {
    onClick: () => { }
};
const CustomLink = withRouter(LinkComponent)

export { CustomLink }
