import React, { useState } from "react";
import Cookies from "universal-cookie";
import styles from './Ticket.module.css'

const Ticket = () => {
    return (
        <div className={styles.register}>
            <div className={styles.ticket}>
                <h1>¡Gracias por tu compra!</h1>
                <table>
                    <tbody className={styles.entry}>
                        <tr>
                            <th>Fortnite</th>
                            <th className={styles.total}>$10.00</th>
                        </tr>
                        <tr>
                            <th>BioShock</th>
                            <th className={styles.total}>$4000.00</th>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th className={styles.total}>$4010.00</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Ticket;