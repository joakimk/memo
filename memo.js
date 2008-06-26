have = new Array();
need = new Array();

function e(id)
{
  return document.getElementById(id);
}

function display(id, visible)
{
  e(id).style.display = visible ? '' : 'none';
}

function add_item()
{
  display('item_form', true);
}

function cancel_item()
{
  display('item_form', false);
}

function save_item()
{
  display('item_form', false);

  var name = e('item_name').value;
  have.push(name);  
  save_state();  
  add_have(name);
}

function add_have(link, name)
{      
  have.push(name);
  need = exclude_value_from_array(need, name);
  save_state(); 
    
  e('need').innerHTML = '';
  show_needs();           
  show_have(name);
}

function add_need(link, name)
{        
  need.push(name);
  have = exclude_value_from_array(have, name);
  save_state();
  
  e('have').innerHTML = '';
  show_haves();
  show_need(name);
}

function show_have(name)
{
  e('have').innerHTML += '<div class="item"><a href="#" onclick="add_need(this, \'' + name + '\')" class="button">Need</a><div class="text"> ' + name + ' </div></div>';  
}

function show_need(name)
{
  e('need').innerHTML += '<div class="item"><a href="#" onclick="add_have(this, \'' + name + '\')" class="button">Have</a><div class="text"> ' + name + ' </div></div>';
}

function exclude_value_from_array(old_array, excluded_value)
{
  new_array = new Array();
  for(var i = 0; i < old_array.length; i++)
  {
    if(old_array[i] != excluded_value)
      new_array.push(old_array[i]);
  }  
  
  return new_array;    
}

function save_state()
{
  save('memo_have', have.join(','));
  save('memo_need', need.join(','));
}

function save(name, value)
{
  var date = new Date();
  var days = 500000;
  date.setTime(date.getTime() + days*24*60*60*1000);
  document.cookie = name + "=" + value + "; expires=" + date.toGMTString();    
}

function load(name)
{
  var pairs = document.cookie.split(';');
  for(var i = 0; i < pairs.length; i++)
  {
    var pair = pairs[i].split('=');
        
    if(pair[0] == ' ' + name || pair[0] == name)
      return pair[1];
  }
}

function load_data()
{  
  var memo_have = load('memo_have');
  var memo_need = load('memo_need');

  if(memo_have != undefined && memo_have != '')
    have = memo_have.split(',');
      
  if(memo_need != undefined && memo_need != '')
    need = memo_need.split(','); 
    
  show_haves();
  show_needs();
}

function show_needs()
{
  for(var i = 0; i < need.length; i++)
  {
    show_need(need[i]);
  }  
}

function show_haves()
{
  for(var i = 0; i < have.length; i++)
  {
    show_have(have[i]);
  }  
}


setTimeout("load_data()", 1);
