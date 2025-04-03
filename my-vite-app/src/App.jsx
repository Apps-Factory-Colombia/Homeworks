import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Singly Linked List Node
class SongNode {
  constructor(song) {
    this.song = song;
    this.next = null;
  }
}

class SongLinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  addSong(song) {
    const newNode = new SongNode(song);
    if (!this.head) {
      this.head = newNode;
      this.current = this.head;
    } else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = newNode;
    }
  }

  nextSong() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
  }
}

const songList = new SongLinkedList();
["Song A", "Song B", "Song C", "Song D"].forEach((s) => songList.addSong(s));

const LinkedListPage = () => {
  const [currentSong, setCurrentSong] = useState(songList.current.song);

  const playNext = () => {
    songList.nextSong();
    setCurrentSong(songList.current.song);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl">Now Playing: {currentSong}</h2>
      <button onClick={playNext} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Next Song
      </button>
    </div>
  );
};

// Doubly Linked List Node
class PageNode {
  constructor(url) {
    this.url = url;
    this.next = null;
    this.prev = null;
  }
}

class BrowserHistory {
  constructor() {
    this.head = null;
    this.current = null;
  }

  visit(url) {
    const newNode = new PageNode(url);
    if (this.current) {
      newNode.prev = this.current;
      this.current.next = newNode;
    }
    this.current = newNode;
    if (!this.head) this.head = newNode;
  }

  goBack() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
  }

  goForward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
  }
}

const history = new BrowserHistory();
["Home", "About", "Services", "Contact"].forEach((url) => history.visit(url));

const DoublyLinkedListPage = () => {
  const [currentPage, setCurrentPage] = useState(history.current.url);

  const goBack = () => {
    history.goBack();
    setCurrentPage(history.current.url);
  };

  const goForward = () => {
    history.goForward();
    setCurrentPage(history.current.url);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl">Current Page: {currentPage}</h2>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={goBack} className="px-4 py-2 bg-red-500 text-white rounded">
          Back
        </button>
        <button onClick={goForward} className="px-4 py-2 bg-green-500 text-white rounded">
          Forward
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-6 flex justify-center gap-6">
          <Link to="/linked-list" className="text-blue-500">Songs</Link>
          <Link to="/doubly-linked-list" className="text-blue-500">Browser History</Link>
        </nav>
        <Routes>
          <Route path="/linked-list" element={<LinkedListPage />} />
          <Route path="/doubly-linked-list" element={<DoublyLinkedListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
