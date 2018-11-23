package com.evv.service;

import com.evv.model.Section;
import com.evv.model.User;

import java.util.List;


public interface ISectionService {

  Section getSectionById(Integer id);
  List<Section> findAllSections(User user);
  void saveOrUpdateSection(Section object);
  Integer save(Section object);
  void deleteSection(Section object);
}
