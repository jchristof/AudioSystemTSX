import * as React from 'react';
import './KeyController.css';

type Props = {};
type State = {};

export default class Dial extends React.Component<Props, State> {
    render() {
        return (
            <ul className="piano">
                <li className="white" data-key="28"/>
                <li className="black" data-key="29"/>
                <li className="white" data-key="30"/>
                <li className="black" data-key="31"/>
                <li className="white" data-key="32"/>
                <li className="white" data-key="33"/>
                <li className="black" data-key="34"/>
                <li className="white" data-key="35"/>
                <li className="black" data-key="36"/>
                <li className="white" data-key="37"/>
                <li className="black" data-key="38"/>
                <li className="white" data-key="39"/>
                <li className="white" data-key="40"/>
                <li className="black" data-key="41"/>
                <li className="white" data-key="42"/>
                <li className="black" data-key="43"/>
                <li className="white" data-key="44"/>
                <li className="white" data-key="45"/>
                <li className="black" data-key="46"/>
                <li className="white" data-key="47"/>
                <li className="black" data-key="48"/>
                <li className="white" data-key="49"/>
                <li className="black" data-key="50"/>
                <li className="white" data-key="51"/>
                <li className="white" data-key="52"/>
                <li className="black" data-key="53"/>
                <li className="white" data-key="54"/>
                <li className="black" data-key="55"/>
                <li className="white" data-key="56"/>
                <li className="white" data-key="57"/>
                <li className="black" data-key="58"/>
                <li className="white" data-key="59"/>
                <li className="black" data-key="60"/>
                <li className="white" data-key="61"/>
                <li className="black" data-key="62"/>
                <li className="white" data-key="63"/>
                <li className="white" data-key="64"/>
            </ul>
        );
    }
}