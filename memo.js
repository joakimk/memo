// Copyright (c) 2008 Joakim K.
// This software is provided 'as-is', without any express or implied warranty.
// In no event will the authors be held liable for any damages arising from
// the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must
// not claim that you wrote the original software. If you use this
// software in a product, an acknowledgment in the product documentation
// would be appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not
// be misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

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

function delete_item()
{
  display('item_delete', true);
  add_items_to_delete_from(need);
  add_items_to_delete_from(have);  
}

function close_delete_item()
{
  display('item_delete', false); 
  e('item_delete_list').innerHTML = '';
}

function delete_item_by_name(name)
{
  if(is_in_array(have, name))
    have = exclude_value_from_array(have, name)
  else
    need = exclude_value_from_array(need, name)  
    
  save_state();
  close_delete_item();  
  e('need').innerHTML = '';
  e('have').innerHTML = '';
  show_needs();
  show_haves();  
}

function is_in_array(array, name)
{
  for(var i = 0; i < array.length; i++)
  {
    if(array[i] == name)
      return true;
  }
  
  return false;
}

function add_items_to_delete_from(list)
{  
  for(var i = 0; i < list.length; i++)
  {
    e('item_delete_list').innerHTML += create_list_item('delete_item_by_name', list[i], "Delete");
  }    
}

function cancel_item()
{
  display('item_form', false);
}

function save_item()
{
  display('item_form', false);

  var name = e('item_name').value;
  add_have(name);
}

function add_have(name)
{      
  have.push(name);
  need = exclude_value_from_array(need, name);
  save_state(); 
  
  e('need').innerHTML = '';
  show_needs();           
  show_have(name);
}

function add_need(name)
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
  e('have').innerHTML += create_list_item('add_need', name, "Need");
}

function show_need(name)
{
  e('need').innerHTML += create_list_item('add_have', name, "Have");
}

function create_list_item(onclick_method, item_text, button_text)
{
  return '<div class="item"><a href="#" onclick="' + onclick_method + '(\'' + item_text + '\'); return false;" class="button">' + button_text + '</a><div class="text"> ' + item_text + ' </div></div>';  
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
  
  display('loading', false);
  display('content', true);
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

// Only way I found to hook into "DOM loaded" on Windows Mobile 5.0 IE.
setTimeout("load_data()", 500);
