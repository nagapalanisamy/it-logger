import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';

const TechSelectOptions = ({ tech: { techs, loading }, getTechs }) => {
	useEffect(() => {
		getTechs();

		//eslint-disable-next-line
	}, []);

	// if (loading || techs === null) {
	// 	return <h4>Loading ..</h4>;
	// }

	return (
		!loading &&
		techs !== null &&
		techs.map((t) => (
			<option key={t.id} value={`${t.firstName} ${t.lastName}`}>
				{t.firstName} {t.lastName}
			</option>
		))
	);
};
TechSelectOptions.propTypes = {
	getTechs: PropTypes.func.isRequired,
	tech: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
