import { Button, Grid, TableBody, TableHead } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import React, { useState } from 'react'

const TableResults = ({games, setGames}) => {
    const [ clicked, setClicked ] = useState("")

    const columns = [{
        id: "id", 
        label: "Id",
    },
    {   
        id: "slots",
        label: "Slots",
    },
    {
        id: "time",
        label: "Time",
    }]

    const sort = (sortType) => {
        if (clicked === "id") {
            setGames(games.slice().sort((elemA, elemB) => elemA.id - elemB.id))
            setClicked("")
            return
        }
        setGames(games.slice().sort((elemA, elemB) => elemB.id - elemA.id))
        setClicked("id")
    }

    return (
        <>
            <Grid>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell key={column.id}>{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.map(game => (
                                <TableRow key={game.id}>
                                    {columns.map(column => {
                                        const value = game[column.id]
                                        return (
                                            <TableCell key={`${column.id} ${game.id}`}>{value}</TableCell>
                                    )})}
                                </TableRow>
                            ))}
                        </TableBody>                      
                    </Table>
                    <Grid container justify='space-evenly'>
                        <Button
                            onClick={() => sort("id")}>
                            Sort
                        </Button>
                    </Grid>
                </TableContainer>
            </Grid>
        </>
    )
}

export default TableResults;