BindableCollection's are similar to arrays, but you can listen to whenever they change. They're
used quite a bit in Mojo views, especially lists.

## API

#### collection.push(item)

adds an item to the collection

```javasript


#### object collection.at(index)

returns an item at the given index

```javascript
var collection = new bindable.Collection([0, 1, 2, 3]);
console.log(collection.at(0)); // 0
```

#### collection.source([newSource])

sets the source of the collection, or returns it.

```javascript
var collection = new bindable.Collection([0, 1, 2, 3]);
console.log(collection.source()); // [0, 1, 2, 3]
collection.source([4, 5, 6]);
console.log(collection.source()); // [4, 5, 6]
```

#### collection.indexOf(item)

returns the index of an item

#### array collection.filter(fn)

#### collection.each(fn)

#### array collection.map(fn)

#### string collection.join(sep)

#### collection.push(item)

pushes an item at the end of the collection

#### collection.unshift(item)

pushes an item at the beginning of an array

#### collection.splice(index, count, newItems...)

Replaces items in the collection

#### collection.remove(item)

returns an item

#### collection.pop()

removes an item at the end of the collection

#### collection.shift()

removes an item at the begging of a collection

## Computed Properties

TODO




