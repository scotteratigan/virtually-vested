import React, { Component } from 'react';
import axios from 'axios';

//todo - add company name w/ special delimiter char

class SearchStocks extends Component {
	state = {
		searchTerm: '',
		tickerSearchResults: []
	}

	handleAddStockBtn = event => {
		event.preventDefault();
		alert('You selected: ' + this.state.searchTerm);
	}

	handleKeyInput = async (event) => {
		console.log(event.nativeEvent);
		// when you type, nativeEvent is an InputEvent and has a data attribute
		// when you click, nativeEvent is an Event and has type: input
		await this.setState({ searchTerm: event.target.value });
		const apiURL = `/api/stock/return_symbols/${this.state.searchTerm}`;
		console.log('Getting URL:', apiURL);
		axios.get(apiURL).then(res => {
			// todo: don't update list user clicks on suggestion
			this.setState({ tickerSearchResults: res.data });
		});
	}

	render() {
		console.log();
		return (
			<form className="search">
				<div className="form-group">
					<label htmlFor="company">company Name:</label>
					<input
						value={this.state.searchTerm}
						onChange={this.handleKeyInput}
						name="company"
						list="companies"
						type="text"
						className="form-control"
						placeholder="Type in company name or stock ticker to begin..."
						id="company"
						autoComplete="off"
					/>
					<datalist id="companies">
						{this.state.tickerSearchResults.length > 1 ? this.state.tickerSearchResults.map(company => (
							<option value={company['1. symbol']} key={company['1. symbol']} onClick={() => alert('hell yeah')} />
						)) : ''}
					</datalist>
					<button onClick={this.handleAddStockBtn} className="btn btn-success">Add Stock</button>
				</div>
			</form>
		);
	}
}

export default SearchStocks;