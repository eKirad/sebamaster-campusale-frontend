// React imports
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

// Component imports
import Page from './Page';
import {StyledLink} from './StyledLink';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
	table: {
		minWidth: 650,
	},
}));

export const ItemList = ({items}) => {
	const linkStyle = {
		color: 'black',
		margin: '10px',
		textDecoration: 'none'
	}	
	
	if (items.length !== 0) {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Img</TableCell>
						<TableCell align="center">Item</TableCell>
						<TableCell align="center">New price</TableCell>
						<TableCell align="center">Old price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map(item => (
						<TableRow key={item._id}>
							<TableCell align="center">
								<Link
									style = {linkStyle} 
									to = {`/item/${item._id}`}>
										Img comes here
								</Link>
							</TableCell>
							<TableCell component="th" scope="row"  align="center">
								<Link 
									style = {linkStyle}
									to = {`/item/${item._id}`}>
									{item.name} - {item.description}
								</Link>
							</TableCell>
							<TableCell align="center">EUR {item.newPrice}</TableCell>
							<TableCell align="center">
								<strike>
									EUR {item.oldPrice}
								</strike>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	} else {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Img</TableCell>
						<TableCell align="center">Item</TableCell>
						<TableCell align="center">New price</TableCell>
						<TableCell align="center">Old price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
						<h1>There are no discounts that match the search criteria.</h1>
				</TableBody>
			</Table>
		);
	}
}