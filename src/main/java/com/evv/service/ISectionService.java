package com.evv.service;

import com.evv.model.Section;

import java.util.List;


public interface ISectionService {

  Section getById(Integer id);
  List<Section> findAll();

}
