package com.evv.controller;

import com.evv.model.Section;
import com.evv.service.ISectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/")
public class MainController {

  @Autowired
  private ISectionService sectionService;

  @RequestMapping(value = "/section/{id}", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public Section getSectionById(@PathVariable Integer id) {
    Section result = sectionService.getSectionById(id);
    return result;
  }

  @RequestMapping(value = "/sections", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<Section> getAllSections() {
    List<Section> result = sectionService.findAllSections();
    return result;
  }

  @RequestMapping(value = "/save_section", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public void saveSection(@RequestBody Section section) {
    sectionService.saveOrUpdateSection(section);
  }

}
