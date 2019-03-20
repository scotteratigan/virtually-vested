import React, { Component } from 'react';
import axios from 'axios';

// todo: add a debouncer to limit API calls

class SearchStocks extends Component {
	state = {
		searchTerm: '',
		tickerSearchResults: []
	}

	handleBtnClick = event => {
		event.preventDefault();
		let searchSymbol = this.state.searchTerm.toUpperCase();
		let companyName = '';
		// if there's a '-', strip out the company name:
		if (this.state.searchTerm.includes('-')) {
			searchSymbol = searchSymbol.substring(0, searchSymbol.indexOf('-'), -1);
			// if we have searched out the company name, grab that now too:
			companyName = this.state.searchTerm.substring(this.state.searchTerm.indexOf('-') + 1);
		}
		console.log('Preparing to call clickFunction with args:', searchSymbol, companyName);
		this.props.clickFunction(searchSymbol, companyName); // clickFunction must be passed down via props
		this.setState({ searchTerm: '' });
	}

	handleKeyInput = async (event) => {
		// todo: add debouncer here?
		console.log(event.nativeEvent);
		// when you type, nativeEvent is an InputEvent and has a data attribute
		// when you click, nativeEvent is an Event and has type: input
		// todo: determine what this looks like on mobile, currently not firing
		const searchAPI = (event.nativeEvent.inputType === 'insertText');
		await this.setState({ searchTerm: event.target.value });
		if (searchAPI) {
			const apiURL = `/api/stock/return_symbols/${this.state.searchTerm}`;
			console.log('Getting URL:', apiURL);
			axios.get(apiURL).then(res => {
				console.log('res.data:', res.data);
				this.setState({ tickerSearchResults: res.data });
			});
		}
	}

	render() {
		return (
			<form className="search">
				<div className="form-group">
					<label htmlFor="company" style={{ fontWeight: 'bold' }}>{this.props.prompt}:</label>
					<input style={{ maxWidth: '450px' }}
						value={this.state.searchTerm}
						onChange={this.handleKeyInput}
						name="company"
						list="companies"
						type="text"
						className="form-control"
						placeholder="ex. 'Microsoft' or 'MSFT'"
						id="company"
						autoComplete="off"
					/>
					<datalist id="companies">
						{this.state.tickerSearchResults.length > 1 ? this.state.tickerSearchResults.map(company => (
							<option value={company.symbol + ' - ' + company.name} key={company.symbol} />
						)) : ''}
					</datalist>
					<br />
					<button onClick={this.handleBtnClick} className="btn btn-primary">{this.props.buttonLabel}</button>
				</div>
				<br />
			</form>
		);
	}
}

export default SearchStocks;