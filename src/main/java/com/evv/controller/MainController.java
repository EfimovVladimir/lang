package com.evv.controller;

import com.evv.model.Section;
import com.evv.service.ISectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class MainController {

  @Autowired
  private ISectionService sectionService;

  @RequestMapping(value = "/section/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Section getSectionById(@PathVariable Integer id) {
    Section result = sectionService.getById(id);
    return result;
  }

}
