import React from 'react';

const Database = props => {
  const { database } = props;
  return (
    <main className="container">
      <h1>Database</h1>
      <p>
        Display:
        <select onChange={props.handleDisplay}>
          <option value="">Select database</option>
          <option value="artists">Artists</option>
          <option value="units">Units</option>
          <option value="members">Members</option>
          <option value="songs">Songs</option>
          <option value="colors">Colors</option>
          <option value="positions">Positions</option>
        </select>
      </p>
      <p>
        Include Depencendies:
        <input
          type="checkbox"
          name="includeDependencies"
          checked={database.includeDependencies}
          onChange={props.toggleIncludeDependencies}
        />
      </p>
      <ul className="tabs" onClick={props.toggleTab}>
        <li
          className={`tab ${database.tab === 'list' ? 'selected' : ''}`}
          id="list"
        >
          List
        </li>
        <li
          className={`tab ${database.tab === 'json' ? 'selected' : ''}`}
          id="json"
        >
          JSON
        </li>
      </ul>
      {database.display && database.tab === 'list' ? (
        <table className="table">
          <thead>
            <tr>
              <th className="th-num">id</th>
              <th>entry</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(database.display).map(key => {
              const entry = database.display[key];

              return (
                <tr key={entry.id}>
                  <td className="th-num">{entry.id}</td>
                  <td>
                    {Object.keys(entry).map(keyName => {
                      if (keyName === 'id') return '';

                      let pair = entry[keyName];
                      const reactKey = `${keyName}${pair}`;

                      if (typeof pair !== 'object') {
                        return (
                          <p key={`${reactKey}`}>
                            <b>{keyName}:</b> {pair}
                          </p>
                        );
                      } else if (
                        Array.isArray(pair) &&
                        typeof pair[0] !== 'object'
                      ) {
                        return (
                          <p key={`${reactKey}`}>
                            <b>{keyName}:</b> {pair.join(', ')}
                          </p>
                        );
                      } else if (Array.isArray(pair)) {
                        return (
                          <p key={`${reactKey}`}>
                            <b>{keyName}:</b>
                            <ul key={`${reactKey}`}>
                              {pair.map(item => {
                                return (
                                  <li>
                                    <ul>
                                      {Object.keys(item).map(i => (
                                        <li key={JSON.stringify(item[i])}>
                                          <b>{i}:</b> {JSON.stringify(item[i])}
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                );
                              })}
                            </ul>
                          </p>
                        );
                      }

                      return (
                        <p key={`${reactKey}`}>
                          <b>{keyName}:</b> {JSON.stringify(pair)}
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
      {props.database.display && props.database.tab === 'json' ? (
        <textarea
          className="textarea-full"
          value={JSON.stringify(props.database.display, null, 2)}
          readOnly
        />
      ) : null}
    </main>
  );
};

export default Database;
