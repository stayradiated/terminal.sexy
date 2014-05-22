function settable_event (table, key, value)
    local h
    if type(table) == "table" then
        local v = rawget(table, key)
        -- if key is present, do raw assignment
        if v ~= nil then rawset(table, key, value); return end
        h = metatable(table).__newindex
        if h == nil then rawset(table, key, value); return end
    else
        h = metatable(table).__newindex
        if h == nil then
            error(···)
        end
    end
    if type(h) == "function" then
        h(table, key,value)           -- call the handler
    else h[key] = value             -- or repeat operation on it
    end
end
