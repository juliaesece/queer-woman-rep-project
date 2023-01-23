import React from 'react';

const Pagination = () => {
  return (
    <div>
      <p> Soon: pages</p>
      <div className="pagination">
        <a href="/home">&laquo;</a>
        <a className="active" href="/home">1</a>
        <a href="/home/1">2</a>
        <a href="/home/2">3</a>
        <a href="/home/3">4</a>
        <a href="/home/4">5</a>
        <a href="/home/5">6</a>
        <a href="/home/6">&raquo;</a>
       </div>
   </div>
 )
}

export default Pagination;
