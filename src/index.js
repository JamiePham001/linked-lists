import "./styles.css";

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class linkedList extends Node {
  constructor(value) {
    super(value);
  }

  append(input, currentNode = this) {
    if (currentNode.value === null) {
      this.value = input;
      return 0;
    }

    if (currentNode.nextNode === null && currentNode.value !== null) {
      currentNode.nextNode = new Node(input, null);
    } else {
      return this.append(input, currentNode.nextNode);
    }
  }

  prepend(input) {
    if (this.value === null) {
      this.value = input;
    } else {
      const newNode = new Node(input, null);
      // create a shallow copy of the object
      newNode.nextNode = Object.assign({}, this);

      this.value = newNode.value;
      this.nextNode = newNode.nextNode;
    }
  }

  size(count = 0, currentNode = this) {
    if (currentNode.value === null) {
      return 0;
    }

    if (currentNode.nextNode === null) {
      return count;
    } else {
      return this.size((count += 1), currentNode.nextNode);
    }
  }

  head() {
    return this.value;
  }

  tail(currentNode = this) {
    if (currentNode.nextNode === null) {
      return currentNode.value;
    } else {
      return this.tail(currentNode.nextNode);
    }
  }

  at(index, count = 0, currentNode = this) {
    if (index === count) {
      return currentNode.value;
    } else {
      return this.at(index, (count += 1), currentNode.nextNode);
    }
  }

  pop(index = 0, currentNode = this) {
    const secondLastNode = this.size() - 1;

    if (currentNode.nextNode === null) {
      return;
    }

    if (secondLastNode === index) {
      currentNode.nextNode = null;
    } else {
      return this.pop((index += 1), currentNode.nextNode);
    }
  }

  contains(value, currentNode = this) {
    if (value === currentNode.value) {
      return true;
    }
    if (currentNode.nextNode === null) {
      return false;
    } else {
      return this.contains(value, currentNode.nextNode);
    }
  }

  find(value, count = 0, currentNode = this) {
    if (value === currentNode.value) {
      return count;
    }
    if (currentNode.nextNode === null) {
      return null;
    } else {
      return this.find(value, (count += 1), currentNode.nextNode);
    }
  }

  toString(currentNode = this, txtString = "") {
    if (currentNode === null) {
      txtString += "null";
      return txtString;
    }

    txtString += `( ${currentNode.value} ) -> `;
    return this.toString(currentNode.nextNode, txtString);
  }

  insertAt(value, index, currentNode = this, count = 0) {
    const maxSize = this.size() + 1;
    if (maxSize < index) {
      console.log("index outside list range");
      return 0;
    }

    if (index === count) {
      const newNode = new Node(value, null);
      newNode.nextNode = Object.assign({}, currentNode);

      currentNode.value = newNode.value;
      currentNode.nextNode = newNode.nextNode;
      return 0;
    } else {
      return this.insertAt(value, index, currentNode.nextNode, (count += 1));
    }
  }

  removeAt(index, currentNode = this, count = 0) {
    if (this.size() < index) {
      console.log("index outside list range");
      return 0;
    }
    if (index === this.size()) {
      if (count === this.size() - 1) {
        currentNode.nextNode = null;
        return 0;
      }
    }

    if (index === count) {
      currentNode.value = currentNode.nextNode.value;
      currentNode.nextNode = currentNode.nextNode.nextNode;
    } else {
      return this.removeAt(index, currentNode.nextNode, (count += 1));
    }
  }
}

//

let linkList = new linkedList();

linkList.append("cat");
linkList.append("dog");
linkList.append("lizard");
linkList.prepend("gold fish");

console.log(linkList.size());
console.log(linkList.head());
console.log(linkList.tail());
console.log(linkList.at(2));
linkList.pop();
console.log(linkList.contains("dog"));
console.log(linkList.find("dog"));
console.log(linkList.toString());
linkList.insertAt("turtle", 2);
linkList.removeAt(3);

console.log(linkList);
