import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, updateLog }) => {
	const [message, setMessage] = useState('');
	const [attention, setAttention] = useState(false);
	const [tech, setTech] = useState('');

	useEffect(() => {
		if (current) {
			setMessage(current.message);
			setTech(current.tech);
			setAttention(current.attention);
		}
	}, [current]);

	const onSubmit = () => {
		if (message === '' || tech === '') {
			M.toast({ html: 'Please enter a message and select the tech' });
		} else {
			const updLog = {
				id: current.id,
				message,
				tech,
				attention,
				date: new Date(),
			};

			updateLog(updLog);
			M.toast({ html: `Log update by ${tech}` });
			//clear fields
			setAttention(false);
			setMessage('');
			setTech('');
		}
	};

	return (
		<div id="edit-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Enter System Log</h4>
				<div className="row">
					<div className="input-field">
						<input
							type="text"
							name="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<div className="input-field">
						<select
							name="tech"
							value={tech}
							className="browser-default"
							onChange={(e) => setTech(e.target.value)}
						>
							<option value=" ">Select Technician</option>
							<TechSelectOptions />
						</select>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<p>
							<label>
								<input
									type="checkbox"
									name="attention"
									className="filled-in"
									value={attention}
									onChange={(e) => setAttention(!attention)}
								/>
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a
					href="#!"
					onClick={onSubmit}
					className="modal-close waves-effect waves-light btn blue"
				>
					Update
				</a>
			</div>
		</div>
	);
};
EditLogModal.propTypes = {
	updateLog: PropTypes.func.isRequired,
	current: PropTypes.object,
};

const modalStyle = {
	width: '75%',
	height: '75%',
};

const mapStateToProps = (state) => ({
	current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
