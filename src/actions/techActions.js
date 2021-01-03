import {
	GET_TECHS,
	ADD_TECH,
	SET_LOADING,
	TECHS_ERROR,
	DELETE_TECH,
} from '../actions/types';

//get techs from the server
export const getTechs = () => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch('/techs');
		const data = await res.json();

		dispatch({
			type: GET_TECHS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TECHS_ERROR,
			payload: err.response.statusText,
		});
	}
};
//Add Technician to the server
export const addTech = (tech) => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch('/techs', {
			method: 'POST',
			body: JSON.stringify(tech),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		dispatch({
			type: ADD_TECH,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TECHS_ERROR,
			payload: err.response,
		});
	}
};
//Delete log from the server
export const deleteTech = (id) => async (dispatch) => {
	try {
		setLoading();
		const res = await fetch(`/techs/${id}`, {
			method: 'DELETE',
		});
		await res.json();

		dispatch({
			type: DELETE_TECH,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: TECHS_ERROR,
			payload: err.response.statusText,
		});
	}
};

//set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
