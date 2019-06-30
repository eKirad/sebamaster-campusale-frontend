import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Page from './Page';
import { Link } from 'react-router-dom';

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

export const ItemList = ({ items }) => {
	return (

		<Table >
			<TableHead>
				<TableRow>
					<TableCell>Item type</TableCell>
					<TableCell align="right">Item name</TableCell>
					<TableCell align="right">Description</TableCell>
					<TableCell align="right">Price</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{items.map(item => (
					<TableRow key={item.itemName}>
						<TableCell component="th" scope="row" >
							<Link to={`/item/${item._id}`}>{item.itemName}</Link>
						</TableCell>
						<TableCell align="right">{item.description}</TableCell>
						<TableCell align="right">{item.price}</TableCell>
						<TableCell align="right">{item.companyId}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
);
}