function indexOf(categories, categoryName){
	for(let i = 0; i < categories.length; i++){
		if(categories[i].name === categoryName){
			return i;
		}
	}
	return -1;
}
