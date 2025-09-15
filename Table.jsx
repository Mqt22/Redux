import React, { useState } from 'react';
import './css/Table.css';
import { useSelector, useDispatch } from 'react-redux';
import { removerow, createrow, Search, setSort } from './redux/counter/Tableslice';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
const Table = () => {
    const rows = useSelector(state => state.Table.rows);
    const searchStd = useSelector(state => state.Table.searchStd);
    const insertbydate = useSelector(state => state.Table.insertbydate);
    // const setSort = useSelector(state => state.Table.setSorting);
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [form, setForm] = React.useState({
        Title: '',
        First_name: '',
        Last_name: '',
        Year: ''
    })
    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handlecreate = (e) => {
        e.preventDefault();
        if (!form.Title || !form.First_name || !form.Last_name || !form.Year) { return; }
        const nextId = rows.length > 0 ? rows[rows.length - 1].Id + 1 : 1;
        setLoad(true);
        setpopup(false);
        setTimeout(() => {
            const newstudent = {
                Id: nextId,
                ...form
            }
            dispatch(createrow(newstudent));
            setForm({ Title: '', First_name: '', Last_name: '', Year: '' });
            setLoad(false);
        }, 2000)
    }
    const [popup, setpopup] = useState(false)
    const handlePopup = () => {
        setpopup(prev => !prev)
    }
    const Close_popup = () => {
        setpopup(false);
    }
    const [currentpage, setCurrentPage] = useState(1);
    const rowsperpage = 5;
    const filterstd = rows.filter(row =>
        row.First_name.toLowerCase().includes(searchStd.toLowerCase()) ||
        row.Last_name.toLowerCase().includes(searchStd.toLowerCase()) ||
        row.Title.toLowerCase().includes(searchStd.toLowerCase()) ||
        row.Year.toLowerCase().includes(searchStd.toLowerCase()) ||
        row.Id.toString().includes(searchStd)
    )
    const index_of_Last_Row = currentpage * rowsperpage;
    const index_of_First_Row = index_of_Last_Row - rowsperpage;
    const Current_Rows = filterstd.slice(index_of_First_Row, index_of_Last_Row);
    const total_page = Math.ceil(filterstd.length / rowsperpage);
    return (
        <>
            <div className="header">
                <label className='label'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="search" name='search' placeholder='Search...' className='input' value={searchStd} onChange={(e) => { dispatch(Search(e.target.value)) }} />
                </label>
                <button onClick={handlePopup} disabled={load}>Add</button>
            </div>
            {/* <div className={`popup ${popup ? 'open' : ''}`}> */}
            {popup && (
                <>
                    <div className='overlay'></div>
                    <div className="popup">
                        <h2>Register Student</h2>
                        <i class="fa-solid fa-xmark" onClick={Close_popup}></i>
                        <hr />
                        <form onSubmit={handlecreate}>
                            <label htmlFor='Title'></label>
                            <input type="text" name='Title' placeholder='Enter your Title' onChange={handlechange} required value={form.Title} />
                            <input type="text" name='First_name' placeholder='Enter your First Name' onChange={handlechange} required value={form.First_name} />
                            <input type="text" name='Last_name' placeholder='Enter your Last Name' onChange={handlechange} required value={form.Last_name} />
                            <input type="text" name='Year' placeholder='Enter your Year' onChange={handlechange} required value={form.Year} />
                            <button type='submit'>Add Student</button>
                        </form>
                    </div>
                </>
            )}
            {load && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            {/* </div> */}
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name='checkbox'/></th>
                        <th>
                            Student id
                            <IoMdArrowDropup
                                onClick={() => dispatch(setSort({ key: "Id", order: "asc" }))}
                                className='arrow_up'
                            />
                            <IoMdArrowDropdown
                                onClick={() => dispatch(setSort({ key: "Id", order: "des" }))}
                                className='arrow_down'
                            />
                        </th>

                        <th>
                            Title
                            <IoMdArrowDropup
                                onClick={() => dispatch(setSort({ key: "Title", order: "asc" }))}
                                className='arrow_up'
                            />
                            <IoMdArrowDropdown
                                onClick={() => dispatch(setSort({ key: "Title", order: "des" }))}
                                className='arrow_down'
                            />
                        </th>

                        <th>
                            First Name
                            <IoMdArrowDropup
                                onClick={() => dispatch(setSort({ key: "First_name", order: "asc" }))}
                                className='arrow_up'
                            />
                            <IoMdArrowDropdown
                                onClick={() => dispatch(setSort({ key: "First_name", order: "des" }))}
                                className='arrow_down'
                            />
                        </th>

                        <th>
                            Last Name
                            <IoMdArrowDropup
                                onClick={() => dispatch(setSort({ key: "Last_name", order: "asc" }))}
                                className='arrow_up'
                            />
                            <IoMdArrowDropdown
                                onClick={() => dispatch(setSort({ key: "Last_name", order: "des" }))}
                                className='arrow_down'
                            />
                        </th>

                        <th>
                            Year
                            <IoMdArrowDropup
                                onClick={() => dispatch(setSort({ key: "Year", order: "asc" }))}
                                className='arrow_up'
                            />
                            <IoMdArrowDropdown
                                onClick={() => dispatch(setSort({ key: "Year", order: "des" }))}
                                className='arrow_down'
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Current_Rows.map((row) => (
                        <tr key={row.Id}>
                            <td><input type="checkbox" /></td>
                            <td>{row.Id}</td>
                            <td>{row.Title}</td>
                            <td>{row.First_name}</td>
                            <td>{row.Last_name}</td>
                            <td>{row.Year}</td>
                            <td><button onClick={() => dispatch(removerow(row.Id))}>Remove Row</button></td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <div className="pagination">
                <button
                    disabled={currentpage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Prev
                </button>

                {Array.from({ length: total_page }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentpage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentpage === total_page}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
                <p>
                    Showing {index_of_First_Row + 1} to {Math.min(index_of_Last_Row, filterstd.length)} of {filterstd.length} rows
                </p>
            </div>
            <div className="log">
                <h3>Insertion Summary:</h3>
                <ul>
                    {Object.entries(insertbydate).map(([date, count]) => (
                        <li key={date}>
                            {date}: {count} rows added
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Table
