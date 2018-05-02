package com.evv.service;

import com.evv.model.Section;

import java.util.List;


public interface ISectionService {

  Section getSectionById(Integer id);
  List<Section> findAllSections();
  void saveOrUpdateSection(Section object);
  Integer save(Section object);
}
