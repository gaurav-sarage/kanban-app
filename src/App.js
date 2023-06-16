import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import Draggable from "react-draggable";

export default function App() {
  const [board, setBoard] = useState([])

  useEffect(() => {
    let data = window.localStorage.getItem("data")
    if (data) {
      setBoard(JSON.parse(data))
    } else {
      setBoard([
        {
          id: 1,
          title: 'To Do',
          cards: [
            {
              id: 1,
              title: 'Learn Solidity',
              description: 'Learn the basics of Solidity'
            },
            {
              id: 2,
              title: 'Learn Firebase',
              description: 'Learn the fundamentals of Firevase'
            }
          ]
        },
        {
          id: 2,
          title: 'In Progress',
          cards: [
            {
              id: 3,
              title: 'Learning React',
              description: 'Learning State and Props'
            },
            {
              id: 4,
              title: 'Learning MongoDB',
              description: 'Learning MongoDB CRUD operations'
            }
          ]
        },
        {
          id: 3,
          title: 'Completed',
          cards: [
            {
              id: 5,
              title: 'Learnt NodeJs',
              description: 'Learnt package management, databases etc'
            },
            {
              id: 6,
              title: 'Learnt Express',
              description: 'Learnt to use Express'
            }
          ]
        }
      ])
    }
  }, [])

  useEffect(() => {
    if (board,length > 0) window.localStorage.setItem("data", JSON.stringify(board))
  }, [board])

  return (
    <div>
      <Header />
      <div style={styles.boardContainer}>
        {board.map((list) => {
          return (
            <div id={`list_${list.id}`} key={list.id} className="list-container"  style={styles.listContainer}>
              <h2>
                {list.title}
              </h2>
              <button style={styles.newCard} onClick={() => {
                let temp_boards = [...board]
                for (let i = 0; i < temp_boards.length; i++) {
                  if(temp_boards[i].id === list.id) {
                    temp_boards[i].cards.push({
                      id: new Date().getTime(),
                      title: 'New Card',
                      description: 'New Card Description'
                    })
                  }
                }
                setBoard(temp_boards)
              }}
              >
                + New Card
              </button>
              {list.cards.map((card) => {
                return (
                  <Draggable key={card.id} onStop={(e,) => {

                  }}
                  >
                    <div style={styles.cardContainer}>
                      <input type={"Text"} style={styles.title} value={card.title} onChange={(e) => {

                      }}
                      />
                      <input type={"text"} style={styles.description} value={card.description} onChange={(e) => {

                      }}
                      />
                    </div>
                  </Draggable>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}
