import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from '../../actions/techActions';
import TechItem from './TechItem';

const TechListModal = ({ tech: { techs, loading }, getTechs }) => {
	useEffect(() => {
		getTechs();

		//eslint-disable-next-line
	}, []);

	// if (loading || techs === null) {
	// 	return <h4>Loading ..</h4>;
	// }

	return (
		<div id="tech-list-modal" className="modal">
			<div className="modal-content">
				<h4>Technician List</h4>
				<ul className="collection">
					{!loading &&
						techs !== null &&
						techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
				</ul>
			</div>
		</div>
	);
};
TechListModal.propTypes = {
	getTechs: PropTypes.func.isRequired,
	tech: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
