cmake_minimum_required(VERSION 3.19)
project(references LANGUAGES CXX)

find_package(Qt6 6.5 REQUIRED COMPONENTS Core Sql)

qt_standard_project_setup()

qt_add_executable(references
    main.cpp
)

target_link_libraries(references
    PRIVATE
        Qt::Core
        Qt::Sql
)

include(GNUInstallDirs)

install(TARGETS references
    BUNDLE  DESTINATION .
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
