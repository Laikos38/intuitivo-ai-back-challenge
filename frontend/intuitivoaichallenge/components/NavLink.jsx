import PropTypes from 'prop-types';

import Link from 'next/link';


NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

NavLink.defaultProps = {
  exact: false
};

export default function NavLink({ children, href, exact, ...props }) {
  return <Link href={href} {...props}>{children}</Link>;
}