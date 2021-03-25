import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (
        <div>
          {JSON.stringify(this.props.emotions)}
          <table className="table table-bordered">
            <tbody>
            {
                  Object.keys(this.props.emotions).map(function (element) {
                     return <tr>
                       <td>{element}</td>
                       <td>{this.props.emotions[element]}</td>
                     </tr>;
                  })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
