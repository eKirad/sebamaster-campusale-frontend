// React imports
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  }));

  const useStyles2 = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }));

export const ItemList = ({ items, onSelectCategory, onEnterKeyword }) => {
    const classes = useStyles2();
    const linkStyle = {
		color: 'black',
		margin: '10px',
		textDecoration: 'none'
    }
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const onSelectedCategory = (selectedCategory) => {
        onSelectCategory(selectedCategory);
    }

    const onFiltered = (filterCriteria) => {
        onEnterKeyword(filterCriteria);
    }
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }
        
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    let tableBodyJSX;
    if (items.length !== 0) {
        tableBodyJSX =  
        <TableBody>
            {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => (
            <TableRow key={item._id}>
                <TableCell component="th" scope="row" align="center">
                    <Link
                        style={linkStyle} 
                        to={`/item/${item._id}`}>
                        Img comes here
                    </Link>
                </TableCell>
                <TableCell component="th" scope="row"  align="center">
                    <Link 
                        style={linkStyle}
                        to={`/item/${item._id}`}>
                        {item.name} - {item.description}
                    </Link>
                </TableCell>
                <TableCell align="center">EUR {item.price - item.price * (item.discount.amountInPercentage / 100)}</TableCell>
                <TableCell align="center">
                    <strike>EUR {item.price}</strike>
                </TableCell>
            </TableRow>
            ))}

            {emptyRows > 0 && (
            <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
            </TableRow>
            )}
        </TableBody>
        } else {
            tableBodyJSX = 				
                <TableBody>
                    There are no discounts that match the search criteria.
                </TableBody>
        }

    return(
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <TableHead>
		    	    <TableRow>
		    		    <TableCell align="center">Img</TableCell>
		    		    <TableCell align="center">Item</TableCell>
		    		    <TableCell align="center">New price</TableCell>
		    		    <TableCell align="center">Old price</TableCell>
		    	    </TableRow>
		        </TableHead>
                {tableBodyJSX}
                <TableFooter>
                    <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'Rows per page' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </TableRow>
                </TableFooter>
                </Table>
            </div>
        </Paper>
    );
}
